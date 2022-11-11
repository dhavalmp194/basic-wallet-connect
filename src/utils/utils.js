export const truncateAddress = (address) => {
    if (!address) return "No Account";
    return address.slice(0, 4) + "...." + address.substr(-4);
  };
  
  export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };
  