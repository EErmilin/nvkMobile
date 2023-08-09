import messsaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messsaging().requestPermission();

  const enabled =
    authStatus === messsaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messsaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
