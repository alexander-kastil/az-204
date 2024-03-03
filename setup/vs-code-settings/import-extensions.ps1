# Read the extensions from a text file
$extensions = Get-Content "vscode_extensions.txt"

# Install each extension
foreach ($extension in $extensions) {
    code --install-extension $extension
}
