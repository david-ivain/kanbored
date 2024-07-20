type MainAPI = {
	boards: API<Board>;
};

type API<T extends Object> = {
	get: (id: string?) => Promise<T[]>;
};

type ViewAPI = {
	dashboard: View<{}>;
};

type View<Args extends Object> = {
	get: (args: Args) => Promise<string>;
};

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
