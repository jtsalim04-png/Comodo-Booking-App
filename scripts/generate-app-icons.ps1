Add-Type -AssemblyName System.Drawing

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$iconSource = Join-Path $root "src\images\comodo-app-logo.png"

function Save-SquareIcon {
    param(
        [string]$SourcePath,
        [string]$DestPath,
        [int]$Size
    )
    $dir = Split-Path $DestPath -Parent
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }

    $src = [System.Drawing.Image]::FromFile($SourcePath)
    $bmp = New-Object System.Drawing.Bitmap $Size, $Size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::FromArgb(0, 0, 0, 0))
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

    $scale = [Math]::Min($Size / $src.Width, $Size / $src.Height)
    $w = [int]($src.Width * $scale)
    $h = [int]($src.Height * $scale)
    $x = ($Size - $w) / 2
    $y = ($Size - $h) / 2
    $g.DrawImage($src, $x, $y, $w, $h)

    $bmp.Save($DestPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    $src.Dispose()
}

$androidSizes = @{
    mdpi    = 48
    hdpi    = 72
    xhdpi   = 96
    xxhdpi  = 144
    xxxhdpi = 192
}

foreach ($entry in $androidSizes.GetEnumerator()) {
    $folder = Join-Path $root "android\app\src\main\res\mipmap-$($entry.Key)"
    Save-SquareIcon $iconSource (Join-Path $folder "ic_launcher.png") $entry.Value
    Save-SquareIcon $iconSource (Join-Path $folder "ic_launcher_round.png") $entry.Value
}

$iosIcons = @(
    @{ Name = "Icon-20@2x.png"; Size = 40 },
    @{ Name = "Icon-20@3x.png"; Size = 60 },
    @{ Name = "Icon-29@2x.png"; Size = 58 },
    @{ Name = "Icon-29@3x.png"; Size = 87 },
    @{ Name = "Icon-40@2x.png"; Size = 80 },
    @{ Name = "Icon-40@3x.png"; Size = 120 },
    @{ Name = "Icon-60@2x.png"; Size = 120 },
    @{ Name = "Icon-60@3x.png"; Size = 180 },
    @{ Name = "Icon-1024.png"; Size = 1024 }
)

$iosDir = Join-Path $root "ios\ComodoApp\Images.xcassets\AppIcon.appiconset"
foreach ($icon in $iosIcons) {
    Save-SquareIcon $iconSource (Join-Path $iosDir $icon.Name) $icon.Size
}

Write-Host "App icons generated from comodo app logo.png"
