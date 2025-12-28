package com.tap_the_number_in_sequence

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AppExitModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AppExit"
    }

    @ReactMethod
    fun exitApp() {
        android.os.Process.killProcess(android.os.Process.myPid())
        System.exit(0)
    }
}
