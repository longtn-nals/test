// export const folderRoot = "/";
export const folderRoot = process.env.NODE_ENV === 'production' ? '/' : '/';
// api root
export const apiRoot =
  process.env.NODE_ENV === 'production'
    ? 'https://5f55a98f39221c00167fb11a.mockapi.io'
    : 'https://5f55a98f39221c00167fb11a.mockapi.io';
