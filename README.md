
# react-native-chart-jackie

## Getting started

`$ npm install react-native-chart-jackie --save`

### Mostly automatic installation

`$ react-native link react-native-chart-jackie`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-chart-jackie` and add `RNChart.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNChart.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.jackieding.chartstool.RNChartPackage;` to the imports at the top of the file
  - Add `new RNChartPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-chart-jackie'
  	project(':react-native-chart-jackie').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-chart-jackie/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-chart-jackie')
  	```


## Usage
```javascript
import RNChart from 'react-native-chart-jackie';

// TODO: What to do with the module?
RNChart;
```
  