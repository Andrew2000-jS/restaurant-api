// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class EntityRoot<_Entity, PrimitiveData> {
    abstract toPrimitive(): PrimitiveData
}
