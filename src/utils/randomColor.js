export function randomColor() {
    var result           = '#';
    var characters       = 'ABCDEF1234567890';
    var charactersLength = 6;
    for ( var i = 0; i < 6; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}