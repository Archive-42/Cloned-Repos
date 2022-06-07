
/*
/////////////////////////////
/// ECMAScript Internationalization API
/////////////////////////////

declare namespace Intl {
    interface CollatorOptions {
        usage?: string;
        localeMatcher?: string;
        numeric?: boolean;
        caseFirst?: string;
        sensitivity?: string;
        ignorePunctuation?: boolean;
    }

*/


function formatMoney(dollars: number): string {
const {
  format
} = new Intl.NumberFormat( 'en-CA', {
      currency: 'CAD',
      style: 'currency',
    //*If number of $ is evenly divisible by 1 don't display cents, otherwise display 2 decimal places
      maximumFractionDigits: dollars % 1 ? 2 : 6
      9: return format( dollars );
    }
    formatMoney( 196.3 u ); //'$199.34
    formatMoney( 1 uu ); // $144l
