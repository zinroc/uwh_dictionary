/** See  npm package express-validator for usage API **/
const check_types = { 
	body: (req, param, err) => {
		return req.checkBody(param, err);
	}, 
	query: (req, param, err) => {
		return req.checkQuery(param, err);
	},
	session: (req, param, err) => {
		return req.checkParams(param, err);
	}
};


function sanitize (req, param) {
	req.sanitize(param).trim();
	req.sanitize(param).escape();
}

const check = {
	email: (req, type) => {
		check_types[type](req, 'email', 'required').notEmpty();
		check_types[type](req, 'email', 'valid email required').isEmail();
	}, 
	password: (req, type) => {
		check_types[type](req, 'password', 'required').notEmpty();
		check_types[type](req, 'password', '6 to 20 charachters required').len(6,20);		
	},
	token: (req, type) => {
		check_types[type](req, 'token', 'required').notEmpty();
		check_types[type](req, 'token', '16 character token required').len(16, 16);
	},
	id: (req, type) => {
		check_types[type](req, 'id', 'required').notEmpty();
		check_types[type](req, 'id', 'not a valid integer').isInt();
	},
	square_feet: (req, type) => {
		if (req[type].square_feet) {
			check_types[type](req, 'square_feet', 'not a valid integer').isInt();
		}
	},
	room_length: (req, type) => {
		if (req[type].room_length) {
			check_types[type](req, 'room_length', 'not a valid integer').isInt();
		}
	},
	room_width: (req, type) => {
		if (req[type].room_width) {
			check_types[type](req, 'room_width', 'not a valid integer').isInt();
		}
	},
	room_type: (req, type) => {
		if (req[type].room_type) {
			check_types[type](req, 'room_type', 'room type is required').notEmpty();
		}
	},
	parking_name: (req, type) => {
		check_types[type](req, 'parking_name', 'required').notEmpty();
	}
}

let validate = {};

module.exports = validate = {
	request
};


function request (req, params) {
	let checkSession = false;
	const keys = Object.keys(params);

	keys.forEach((k) => {
		if (params[k] === 'session'){
			checkSession = true;
		}
	});

	if (req.hasOwnProperty('session') && checkSession) {
		//place req.session into req.params so that req.assert applies to it
		for (let key in req.session){
			if (key === 'email' || key === 'token') { //tracked properties of session
				req.params[key] = req.session[key]; 
			}
		}
	} else if (checkSession) {
		req.params.email = 'invalid';
		req.params.token = 'invalid';
	}

	keys.forEach((k) => {
		sanitize(req, k); //sanitize doesn't need to specify params[k], sanitizes body, query and params
		if (check.hasOwnProperty(k)) {//validation check doesn't exist for optional string parameters without restrictions & 
			check[k](req, params[k]);
		}
	});

	return req.getValidationResult();
}