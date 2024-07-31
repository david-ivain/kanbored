type Board = {
	id: string;
	name: string;
	description: string;
	issues: Issue[];
};

type Issue = {
	id: string;
	name: string;
	description: string;
	type: string;
	status: string;
};
