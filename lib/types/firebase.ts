export interface FirebaseSnapshot<T = unknown> {
  val(): T | null;
  exists(): boolean;
}

export interface FirebaseNestedSnapshot<T = unknown> {
  [parentId: string]: {
    [childId: string]: T;
  } | null;
}

export interface FirebaseFlatSnapshot<T = unknown> {
  [id: string]: T | null;
}
