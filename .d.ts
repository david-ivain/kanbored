type API<T extends Object> = {
	get: (id?: string) => Promise<T[]>;
};

type Controller = {
	[key: string]: View;
};

type View<
	GetArgs extends Object = {} | undefined,
	PostArgs extends Object = {} | undefined,
	PutArgs extends Object = {} | undefined,
	DeleteArgs extends Object = {} | undefined
> = {
	get?: (args: GetArgs) => Promise<string>;
	post?: (args: PostArgs) => Promise<string>;
	put?: (args: PutArgs) => Promise<string>;
	delete?: (args: DeleteArgs) => Promise<string>;
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
