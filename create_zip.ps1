$ProjectFolder = "D:\Project\Inside IIM project\ai-investment-agent"
$ZipFilePath = "D:\Project\Inside IIM project\Assignment_Submission.zip"

# Delete the old zip if it exists
if (Test-Path $ZipFilePath) { Remove-Item $ZipFilePath }

# Get all files except node_modules, dist, and .git
Get-ChildItem -Path $ProjectFolder -Recurse -Exclude "node_modules", "dist", ".git" |
    Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\\.git\\' -and $_.FullName -notmatch '\\dist\\' } |
    Compress-Archive -DestinationPath $ZipFilePath -Update

Write-Host "✅ Zip file created successfully at: $ZipFilePath"
