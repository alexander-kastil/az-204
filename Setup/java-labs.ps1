choco install jdk8 -y
choco install tomcat -y -PackageParameters "/D=C:\Program Files\Tomcat"
choco install maven -y

code --install-extension redhat.java
code --install-extension vscjava.vscode-maven