# Crops the teammate headshots used in the chat mockups to 160px squares.
# Source photos come from ../flowcasta/public/avatars (already used in our own
# products). Each entry: output name, source file, face centre (x, y as a
# fraction of the image) and crop size (fraction of the shorter side).
param([string]$Source = "$PSScriptRoot\..\..\flowcasta\public\avatars")

Add-Type -AssemblyName System.Drawing
$out = Join-Path $PSScriptRoot '..\src\assets\avatars'
New-Item -ItemType Directory -Force $out | Out-Null

$people = @(
  @('maya', 'avatar-4.jpg', 0.50, 0.32, 0.48),
  @('daniel', 'avatar-5.jpg', 0.58, 0.34, 0.60),
  @('priya', 'avatar-10.jpg', 0.50, 0.36, 0.42),
  @('sam', 'avatar-9.jpg', 0.50, 0.42, 0.85),
  @('marcus', 'avatar-6.jpg', 0.50, 0.33, 0.66),
  @('leo', 'avatar-7.jpg', 0.60, 0.38, 0.66),
  @('kwame', 'avatar-1.jpg', 0.46, 0.48, 0.52),
  @('ana', 'avatar-8.jpg', 0.58, 0.42, 0.80)
)

$jpeg = [Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$params = New-Object Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object Drawing.Imaging.EncoderParameter ([Drawing.Imaging.Encoder]::Quality), 82L

foreach ($p in $people) {
  $img = [Drawing.Image]::FromFile((Join-Path $Source $p[1]))
  $size = [int]([Math]::Min($img.Width, $img.Height) * $p[4])
  $x = [int]([Math]::Max(0, [Math]::Min($img.Width - $size, $img.Width * $p[2] - $size / 2)))
  $y = [int]([Math]::Max(0, [Math]::Min($img.Height - $size, $img.Height * $p[3] - $size / 2)))
  $bmp = New-Object Drawing.Bitmap 160, 160
  $g = [Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.DrawImage($img, (New-Object Drawing.Rectangle 0, 0, 160, 160), (New-Object Drawing.Rectangle $x, $y, $size, $size), [Drawing.GraphicsUnit]::Pixel)
  $bmp.Save((Join-Path $out "$($p[0]).jpg"), $jpeg, $params)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
}
"wrote $($people.Count) avatars"



