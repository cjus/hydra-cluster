export const DELETE_ENTITY = 'DELETE_ENTITY';

export function deleteEntity(entityType, entityId) {
  return {
    type: DELETE_ENTITY,
    entityType,
    entityId
  };
}
