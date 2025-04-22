package com.pharmacube.patient;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    registerPlugins(new ArrayList<Class<? extends Plugin>>());
    super.onCreate(savedInstanceState);
  }
} 