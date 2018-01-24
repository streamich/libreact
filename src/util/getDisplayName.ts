const getDisplayName = (Comp: any) => {
  const tipof = typeof Comp;

  switch (tipof) {
    case 'string':
      return Comp;
    case 'function':
      return Comp.displayName || Comp.name || 'Unknown';
    case 'object':
        return `<${Comp.type.displayName || Comp.type.name || String(Comp)}>`;
    default:
      return 'Unknown';
  }
}

export default getDisplayName;
