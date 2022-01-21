import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
export class MyValidators {
	static restrictedEmails(control: FormControl): { [key: string]: boolean } {
		if (['v@mail.ru', 'test@mail.ru'].includes(control.value)) {
			return {
				restictedEmail: true
			}
		}
		return null;
	}

	static uniqueEmail(control: FormControl): Promise<any> | Observable<any> {
		return new Promise(resolve => {
			setTimeout(() => {
				if (control.value === 'async@mail.ru') {
					resolve({
						uniqueEmail: 'true'
					})
				}
				else {
					resolve(null);
				}
			}, 1000)
		})
	}
}