export const MOBILE_DETECT = 'MOBILE_DETECT';

export function mobileDetect(devices) {
  return {
    type: MOBILE_DETECT,
    ...devices
  };
}
