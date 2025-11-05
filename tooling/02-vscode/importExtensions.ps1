foreach ($line in Get-Content .\extensions.txt) {
    code --install-extension $line
}