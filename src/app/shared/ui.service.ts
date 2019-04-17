import { Subject } from 'rxjs'

export class UIService {
  public loadingStateChanged = new Subject<boolean>()
}
