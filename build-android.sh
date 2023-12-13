#!/bin/bash

# Установите желаемые значения versionCode и versionName
VERSION_CODE=70
VERSION_NAME="1.0.7"

# Выполните команду сборки с заданными параметрами
cd android && ./gradlew app:assembleRelease -PnewVersionCode=$VERSION_CODE -PnewVersionName=$VERSION_NAME
