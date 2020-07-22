import { Schema, Document, model } from 'mongoose';

type educationObj = {
	school_or_college: string;
	degree: string;
	fieldofstudy: string;
	semester_or_grade: number;
	description: string;
};

type jobObj = {
	title: string;
	company: string;
	location: string;
	description: string;
};

type linkObj = {
	youtube: string;
	twitter: string;
	facebook: string;
	linkedin: string;
	instagram: string;
};

export interface IProfile extends Document {
	user: string;
	location: string;
	bio: string;
	githubusername: string;
	currentEducation: educationObj;
	currentJob: jobObj;
	socialLinks: linkObj;
	date: Date;
}

const ProfileSchema: Schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	location: {
		type: String
	},
	bio: {
		type: String
	},
	dob: {
		type: Date
	},
	githubusername: {
		type: String
	},
	gender: {
		type: String
	},
	currentEducation: {
		school_or_college: {
			type: String,
			required: true
		},
		degree: {
			type: String,
			required: true
		},
		fieldofstudy: {
			type: String,
			required: true
		},
		semester_or_grade: {
			type: Number,
			required: true
		},
		description: {
			type: String
		}
	},
	currentJob: {
		title: {
			type: String,
			required: true
		},
		company: {
			type: String,
			required: true
		},
		location: {
			type: String
		},
		description: {
			type: String
		}
	},
	socialLinks: {
		youtube: {
			type: String
		},
		twitter: {
			type: String
		},
		facebook: {
			type: String
		},
		linkedin: {
			type: String
		},
		instagram: {
			type: String
		}
	},
	date: {
		type: Date,
		default: Date.now
	}
});

export default model<IProfile>('Profile', ProfileSchema);
