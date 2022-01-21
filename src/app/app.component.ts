import { MyValidators } from './my.validators';
import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	form: FormGroup

	ngOnInit(): void {
		this.form = new FormGroup({
			email: new FormControl('', [Validators.email, Validators.required, MyValidators.restrictedEmails], [MyValidators.uniqueEmail]),
			password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
			address: new FormGroup({
				country: new FormControl('ru'),
				city: new FormControl('', Validators.required)
			}),
			skills: new FormArray([])
		})
	}

	submit(): void {
		console.log('Form submitted: ', this.form);
		const formData = { ...this.form.value };

		console.log('Form data: ', formData);

		this.form.reset();
	}

	setCapital(): void {
		const cityMap = {
			ru: 'Москва',
			ua: 'Киев',
			by: 'Минск'
		}

		const cityKey = this.form.get('address').get('country').value;
		const city = cityMap[cityKey];

		this.form.patchValue({
			address: { city: city }
		})
	}

	addSkill(): void {
		const control = new FormControl('', Validators.required);
		// (<FormArray>this.form.get('skills')).push
		(this.form.get('skills') as FormArray).push(control)
	}
}

