package com.nvksakha;

import android.content.res.Configuration;
import android.os.Bundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.google.android.gms.cast.framework.CastContext;

import org.devio.rn.splashscreen.SplashScreen;
// import com.reactnativepipandroid.PipAndroidModule; // с этим включить падает

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    switch (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) {
      case Configuration.UI_MODE_NIGHT_YES:
        setTheme(R.style.DarkTheme);
        break;
      case Configuration.UI_MODE_NIGHT_NO:
        setTheme(R.style.LightTheme);
        break;
      default:
        setTheme(R.style.LightTheme);
    }
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
    try {
      // lazy load Google Cast context
      CastContext.getSharedInstance(this);
    } catch (Exception e) {
      // cast framework not supported
    }
  }
  //если включить пидиет приложение
  // @Override
  // public void onPictureInPictureModeChanged (boolean isInPictureInPictureMode, Configuration newConfig) {
  //   PipAndroidModule.pipModeChanged(isInPictureInPictureMode);
  // }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "NVKSakha";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }
}
