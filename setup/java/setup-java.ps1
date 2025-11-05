choco install openjdk --version=17.0.2 -y
choco install tomcat -y -PackageParameters "/D=C:\Program Files\Tomcat"
choco install maven -y
choco install spring-boot-cli -y

code --install-extension redhat.java
code --install-extension vscjava.vscode-maven
code --install-extension vscjava.vscode-gradle
code --install-extension vscjava.vscode-java-debug
code --install-extension vscjava.vscode-java-dependency
code --install-extension vscjava.vscode-java-pack
code --install-extension vscjava.vscode-java-test