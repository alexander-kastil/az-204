# Java Setup

- Set JavaHome environment variable to `C:\Program Files\OpenJDK\jdk-20.0.2`

    ```powershell
    $javaHome = [Environment]::GetEnvironmentVariable("JAVA_HOME", "Machine")
    Write-Output "JAVA_HOME is set to: $javaHome"
    ```

- Set MavenHome environment variable to `C:\ProgramData\chocolatey\lib\maven\apache-maven-3.9.6\bin`

    ```powershell
    $mvHome = [Environment]::GetEnvironmentVariable("MavenHome", "Machine")
    Write-Output "MavenHome is set to: $mvHome"
    ```