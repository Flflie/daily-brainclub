$root = Join-Path $PSScriptRoot ""
$port = 8934
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Output "Serving $root on http://localhost:$port/"

$mime = @{
  ".html"    = "text/html"
  ".js"      = "application/javascript"
  ".css"     = "text/css"
  ".json"    = "application/json"
  ".webmanifest" = "application/manifest+json"
  ".png"     = "image/png"
  ".jpg"     = "image/jpeg"
  ".jpeg"    = "image/jpeg"
  ".svg"     = "image/svg+xml"
  ".ico"     = "image/x-icon"
}

$rooms = @{}
$leaderboard = @{}
$dailySeeds = @{}

function New-RoomCode {
  $chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  $code = ""
  for ($i = 0; $i -lt 5; $i++) { $code += $chars[(Get-Random -Maximum $chars.Length)] }
  return $code
}

function Send-Json($res, $obj, $status = 200) {
  $json = $obj | ConvertTo-Json -Depth 10 -Compress
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
  $res.StatusCode = $status
  $res.ContentType = "application/json"
  $res.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
  $res.ContentLength64 = $bytes.Length
  $res.OutputStream.Write($bytes, 0, $bytes.Length)
}

function Read-JsonBody($req) {
  $reader = New-Object System.IO.StreamReader($req.InputStream, $req.ContentEncoding)
  $text = $reader.ReadToEnd()
  if ([string]::IsNullOrWhiteSpace($text)) { return New-Object PSObject }
  return $text | ConvertFrom-Json
}

function Room-Public($room) {
  $playersOut = @()
  foreach ($p in $room.players.Values) {
    $playersOut += @{
      id = $p.id
      name = $p.name
      scores = $p.scores
      totalScore = $p.totalScore
      finishedCount = $p.finishedCount
      done = $p.done
    }
  }
  return @{
    code = $room.code
    seed = $room.seed
    status = $room.status
    hostId = $room.hostId
    createdAt = $room.createdAt
    players = $playersOut
  }
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $req = $context.Request
  $res = $context.Response
  try {
    $path = $req.Url.AbsolutePath
    $method = $req.HttpMethod

    if ($path -like "/api/*") {
      try {
        if ($method -eq "POST" -and $path -eq "/api/rooms") {
          $body = Read-JsonBody $req
          $code = New-RoomCode
          while ($rooms.ContainsKey($code)) { $code = New-RoomCode }
          $playerId = [guid]::NewGuid().ToString("N").Substring(0, 8)
          $players = @{}
          $players[$playerId] = @{
            id = $playerId; name = [string]$body.name; scores = @{}
            totalScore = 0; finishedCount = 0; done = $false
          }
          $room = @{
            code = $code
            seed = Get-Random -Minimum 1 -Maximum 2147483647
            status = "lobby"
            hostId = $playerId
            createdAt = (Get-Date).ToString("o")
            players = $players
          }
          $rooms[$code] = $room
          Send-Json $res (@{ ok = $true; playerId = $playerId; room = (Room-Public $room) })
        }
        elseif ($method -eq "POST" -and $path -match "^/api/rooms/([A-Z0-9]+)/join$") {
          $code = $matches[1]
          $body = Read-JsonBody $req
          if (-not $rooms.ContainsKey($code)) {
            Send-Json $res (@{ ok = $false; error = "not_found" }) 404
          } elseif ($rooms[$code].status -ne "lobby") {
            Send-Json $res (@{ ok = $false; error = "already_started" }) 409
          } else {
            $room = $rooms[$code]
            $playerId = [guid]::NewGuid().ToString("N").Substring(0, 8)
            $room.players[$playerId] = @{
              id = $playerId; name = [string]$body.name; scores = @{}
              totalScore = 0; finishedCount = 0; done = $false
            }
            Send-Json $res (@{ ok = $true; playerId = $playerId; room = (Room-Public $room) })
          }
        }
        elseif ($method -eq "GET" -and $path -match "^/api/rooms/([A-Z0-9]+)$") {
          $code = $matches[1]
          if (-not $rooms.ContainsKey($code)) {
            Send-Json $res (@{ ok = $false; error = "not_found" }) 404
          } else {
            Send-Json $res (@{ ok = $true; room = (Room-Public $rooms[$code]) })
          }
        }
        elseif ($method -eq "POST" -and $path -match "^/api/rooms/([A-Z0-9]+)/start$") {
          $code = $matches[1]
          if (-not $rooms.ContainsKey($code)) {
            Send-Json $res (@{ ok = $false; error = "not_found" }) 404
          } else {
            $room = $rooms[$code]
            $room.status = "playing"
            $room.startedAt = (Get-Date).ToString("o")
            Send-Json $res (@{ ok = $true; room = (Room-Public $room) })
          }
        }
        elseif ($method -eq "POST" -and $path -match "^/api/rooms/([A-Z0-9]+)/score$") {
          $code = $matches[1]
          $body = Read-JsonBody $req
          if (-not $rooms.ContainsKey($code)) {
            Send-Json $res (@{ ok = $false; error = "not_found" }) 404
          } else {
            $room = $rooms[$code]
            $playerId = [string]$body.playerId
            if (-not $room.players.ContainsKey($playerId)) {
              Send-Json $res (@{ ok = $false; error = "player_not_found" }) 404
            } else {
              $player = $room.players[$playerId]
              $puzzleId = [string]$body.puzzleId
              $isNewPuzzle = -not $player.scores.ContainsKey($puzzleId)
              $player.scores[$puzzleId] = [int]$body.score
              if ($isNewPuzzle) { $player.finishedCount++ }
              $sum = 0
              foreach ($v in $player.scores.Values) { $sum += $v }
              $player.totalScore = $sum
              if ($player.finishedCount -ge 7) { $player.done = $true }
              Send-Json $res (@{ ok = $true; room = (Room-Public $room) })
            }
          }
        }
        elseif ($method -eq "GET" -and $path -match "^/api/daily-seed/(\d{4}-\d{2}-\d{2})$") {
          $date = $matches[1]
          if (-not $dailySeeds.ContainsKey($date)) {
            $dailySeeds[$date] = Get-Random -Minimum 1 -Maximum 2147483647
          }
          Send-Json $res (@{ ok = $true; date = $date; seed = $dailySeeds[$date] })
        }
        elseif ($method -eq "POST" -and $path -eq "/api/leaderboard") {
          $body = Read-JsonBody $req
          $date = [string]$body.date
          if (-not $leaderboard.ContainsKey($date)) { $leaderboard[$date] = @{} }
          $deviceId = [string]$body.deviceId
          $leaderboard[$date][$deviceId] = @{
            deviceId = $deviceId
            name = [string]$body.name
            score = [int]$body.score
            streak = [int]$body.streak
            submittedAt = (Get-Date).ToString("o")
          }
          Send-Json $res (@{ ok = $true })
        }
        elseif ($method -eq "GET" -and $path -match "^/api/leaderboard/(\d{4}-\d{2}-\d{2})$") {
          $date = $matches[1]
          $entries = @()
          if ($leaderboard.ContainsKey($date)) {
            $entries = @($leaderboard[$date].Values | Sort-Object -Property score -Descending | ForEach-Object {
              @{ deviceId = $_.deviceId; name = $_.name; score = $_.score; streak = $_.streak }
            })
          }
          Send-Json $res (@{ ok = $true; date = $date; entries = $entries })
        }
        else {
          Send-Json $res (@{ ok = $false; error = "unknown_route" }) 404
        }
      } catch {
        Send-Json $res (@{ ok = $false; error = "server_error"; message = $_.Exception.Message }) 500
      }
    }
    else {
      if ($path -eq "/") { $path = "/index.html" }
      $filePath = Join-Path $root ($path.TrimStart("/"))
      $filePath = [System.IO.Path]::GetFullPath($filePath)
      if (-not $filePath.StartsWith([System.IO.Path]::GetFullPath($root))) {
        $res.StatusCode = 403
      } elseif (Test-Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath)
        $ct = $mime[$ext]
        if (-not $ct) { $ct = "application/octet-stream" }
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $res.ContentType = $ct
        $res.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate")
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      } else {
        $res.StatusCode = 404
      }
    }
  } catch {
  } finally {
    $res.Close()
  }
}
