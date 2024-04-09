ngOnInit(): void {
    this.worker = this._fromBuilder.group({
        'id': new FormControl(0),
        'firstName': new FormControl("", Validators.required),
        'lastName': new FormControl("", Validators.required),
        'identity': new FormControl("", [Validators.required]),
        'address': new FormControl("", Validators.required),
        'email': new FormControl("", [Validators.required, Validators.email]),
        'kind': new FormControl(0, [Validators.required]),
        'status': new FormControl(true, Validators.required),
        'stratDate': new FormControl(new Date(), [Validators.required, DateValidator]),
        'dateOfBirth': new FormControl("", [Validators.required, DateValidator]),
        'roles': this._fromBuilder.array([]),
        'menagerId': new FormControl(Number(sessionStorage.getItem("userId")))
    });

    roles(): FormArray {
        return this.worker.get('roles') as FormArray;
    }
    
      addRole() {
        this.roles().push(this.newRole());
    }
    
      removeRole(i: number) {
        this.roles().removeAt(i);
    }
    
      newRole() {
        return this._fromBuilder.group({
            'id': new FormControl(0),
            'roleTypeId': new FormControl(0, Validators.required),
            'menagment': new FormControl(false, Validators.required),
            'stratDate': new FormControl(new Date(), Validators.required),
        });
    }
