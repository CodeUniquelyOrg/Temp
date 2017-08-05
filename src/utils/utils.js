function encodeTicks() {
  var nowticks = Math.floor((new Date().getTime()) / 256);
  var possible = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-';
  var response = '';
  while(nowticks > 0) {
    response += possible.charAt(nowticks % 0x40);
    nowticks = Math.floor(nowticks / 64);
  }
  return response;
}

export default encodeTicks;