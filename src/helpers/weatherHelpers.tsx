import {WeatherConditionType} from '../models/Weather';
import {
  ClearWeather,
  CloudsWeather,
  CloudyWeather,
  DrizzleWeather,
  LightRainWeather,
  PartlyCloudyWeather,
  RainWeather,
  SnowWeather,
  HailWeather,
  StormWeather,
} from '../components/SVGcomponents';

export const weatherConditionIcon = (
  condition: WeatherConditionType | null,
) => {
  switch (condition) {
    case 'clear':
      return <ClearWeather />;
    case 'partly-cloudy':
      return <PartlyCloudyWeather />;
    case 'cloudy':
      return <CloudyWeather />;
    case 'overcast':
      return <CloudsWeather />;
    case 'drizzle':
      return <DrizzleWeather />;
    case 'light-rain':
      return <LightRainWeather />;
    case 'rain':
      return <RainWeather />;
    case 'moderate-rain':
      return <RainWeather />;
    case 'heavy-rain':
      return <RainWeather />;
    case 'continuous-heavy-rain':
      return <RainWeather />;
    case 'showers':
      return <RainWeather />;
    case 'wet-snow':
      return <HailWeather />;
    case 'light-snow':
      return <HailWeather />;
    case 'snow':
      return <SnowWeather />;
    case 'snow-showers':
      return <SnowWeather />;
    case 'hail':
      return <HailWeather />;
    case 'thunderstorm':
      return <StormWeather />;
    case 'thunderstorm-with-rain':
      return <StormWeather />;
    case 'thunderstorm-with-hail':
      return <StormWeather />;
    default:
      return <CloudyWeather />;
  }
};
