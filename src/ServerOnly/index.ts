const isServer = (typeof process === 'object') && (typeof process.exit === 'function');

export const ServerOnly = (props) => isServer ? props.children : null;
