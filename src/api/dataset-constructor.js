export class DatasetConstructor {
  construct(object, element, prefix) {
    const dataset = element.dataset;
    for (let property of Object.keys(dataset)) {
      const value = dataset[property];
      if (prefix) {
        property = property.match(`^${prefix}(.*?)$`);
        if (!property) {
          continue;
        }
        property = property[1].replace(/^./, c => c.toLowerCase());
      }
      object[property] = value;
    }
  }
}
