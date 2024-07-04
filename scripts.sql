CREATE TABLE Candidates  (
	Id uuid,
    User_id int,
    FirstName varchar(255),
    LastName varchar(255),
    PhoneNumber int,
    Email varchar(100)
);

ALTER TABLE public.candidates ADD user_type public.user_type NULL;

ALTER TABLE public.candidates ALTER COLUMN id SET NOT NULL;

ALTER TABLE public.candidates ADD CONSTRAINT candidates_uk UNIQUE (id);

--------------------------


CREATE TABLE Employers  (
	Id uuid,
    User_id int,
    FirstName varchar(255),
    LastName varchar(255),
    CompanyName varchar(255),
    PhoneNumber int,
    Email varchar(100)
);

ALTER TABLE public.employers ADD user_type public.user_type NULL;

ALTER TABLE public.employers ALTER COLUMN id SET NOT NULL;

ALTER TABLE public.employers ADD CONSTRAINT employers_uk UNIQUE (id);


-- ---------------------------------


CREATE TABLE Jobs  (
	Id uuid,
    Employer_id uuid,
    Job_role varchar(255),
    Job_location varchar(255),
    Job_type varchar(255),
    Job_salary int,
    Job_status int
);

ALTER TABLE public.jobs ALTER COLUMN id SET NOT NULL;

ALTER TABLE public.jobs ADD CONSTRAINT jobs_uk UNIQUE (id);

ALTER TABLE public.jobs ADD CONSTRAINT jobs_employers_fk FOREIGN KEY (employer_id) REFERENCES public.employers(id);


---------------------------------------------------------------


CREATE TABLE public.applications (
	id uuid NOT NULL,
	job_id uuid NOT NULL,
	candidate_id uuid NOT NULL,
	status varchar NULL,
	CONSTRAINT applications_pk PRIMARY KEY (id),
	CONSTRAINT applications_jobs_fk FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE,
	CONSTRAINT applications_candidates_fk FOREIGN KEY (candidate_id) REFERENCES public.candidates(id)
);



CREATE TABLE public.featured_jobs (
	id uuid NOT NULL,
	job_id uuid NOT NULL,
	candidate_id uuid NOT NULL,
	status varchar NULL,
	CONSTRAINT featured_jobs_jobs_fk FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT featured_jobs_candidates_fk FOREIGN KEY (candidate_id) REFERENCES public.candidates(id)
);
