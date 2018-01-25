const getDisplayName = (Comp: any) => {
  const tipof = typeof Comp;

  switch (tipof) {
    case 'string':
      return Comp;
    case 'function':
      return Comp.displayName || Comp.name || 'Unknown';
    case 'object':
      const {type} = Comp;

      return typeof type === 'function' ?
        `<${type.displayName || type.name || String(Comp)}>` :
        `<Unknown>`;
    default:
      return 'Unknown';
  }
}

export default getDisplayName;
