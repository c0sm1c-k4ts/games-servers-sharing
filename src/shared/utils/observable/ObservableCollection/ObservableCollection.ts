import { BehaviorSubject } from "rxjs";
import { IObserver } from "../../../../shared/types/observable";

export class ObservableCollection<T extends object> {
  protected collection: BehaviorSubject<T>;

  constructor(collection: T) {
    this.collection = new BehaviorSubject(collection);
  }

  addObserver = (observer: IObserver) => {
    this.collection.subscribe(observer.update);
  };

  addObservers = (observers: IObserver[]) => {
    observers.forEach(this.addObserver);
  };

  protected getValues = () => this.collection.getValue();
  protected notifyObservers = (val?: T) =>
    this.collection.next(val || this.getValues());
}
