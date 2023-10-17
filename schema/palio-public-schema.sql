create schema if not exists "public";

create table if not exists public."user" (
	username varchar(50),
	"name" text,
	surname text,
	mail text,
	propic text,
	uid varchar(50),
	primary key(username)
);


create table if not exists public."achievement" (
	"name" varchar(50),
	"description" text,
	"icon" varchar(5),
	"difficulty" int,
	section varchar(100),
	primary key("name")
);

create table if not exists public."user_achievement" (
	"user" varchar(50),
	"achievement" text,
	"status" int,
	primary key("user", "achievement"),
	constraint FK_user foreign key("user")
        REFERENCES public."user"(username),
    constraint FK_achievement foreign key("achievement")
        REFERENCES public."achievement"("name")
);

create table if not exists public."achievement_request" (
	requesting_user varchar(50),
	destination_user varchar(50),
	achievement varchar(50),
	status int,
	primary key(requesting_user, destination_user, achievement),
	constraint FK_user_achievement_request_sender foreign key(requesting_user)
        REFERENCES public."user"(username),
    constraint FK_user_achievement_request_receiver foreign key(destination_user)
        REFERENCES public."user"(username),
    constraint FK_achievement_achievement_request foreign key(achievement)
        REFERENCES public."achievement"("name")
);
