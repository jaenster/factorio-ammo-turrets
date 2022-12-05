@echo off

IF EXIST "%appdata%\Factorio\mods\AmmoTurrets_0.0.1" (
    rmdir "%appdata%\Factorio\mods\AmmoTurrets_0.0.1" /s /q
)
mkdir "%appdata%\Factorio\mods\AmmoTurrets_0.0.1"

IF EXIST ".\output" (
    rmdir ".\output" /s /q
)
mkdir ".\output"

IF EXIST ".\bin" (
    rmdir ".\bin" /s /q
)
mkdir ".\bin"

cmd /c npx tstl

xcopy bin\* output /s /e

xcopy output\* %appdata%\Factorio\mods\AmmoTurrets_0.0.1\* /s /e
@echo on