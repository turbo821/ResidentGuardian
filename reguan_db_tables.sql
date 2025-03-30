--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2025-03-31 02:43:37

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 107957)
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- TOC entry 5845 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 235 (class 1259 OID 116149)
-- Name: Answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Answers" (
    "Id" uuid NOT NULL,
    "IssueId" uuid NOT NULL,
    "ModeratorId" uuid NOT NULL,
    "UpdatePhotoUrl" text,
    "Text" text,
    "CreatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Answers" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 109060)
-- Name: AspNetRoleClaims; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AspNetRoleClaims" (
    "Id" integer NOT NULL,
    "RoleId" uuid NOT NULL,
    "ClaimType" text,
    "ClaimValue" text
);


ALTER TABLE public."AspNetRoleClaims" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 109059)
-- Name: AspNetRoleClaims_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."AspNetRoleClaims" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."AspNetRoleClaims_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 109038)
-- Name: AspNetRoles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AspNetRoles" (
    "Id" uuid NOT NULL,
    "Name" character varying(256),
    "NormalizedName" character varying(256),
    "ConcurrencyStamp" text
);


ALTER TABLE public."AspNetRoles" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 109073)
-- Name: AspNetUserClaims; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AspNetUserClaims" (
    "Id" integer NOT NULL,
    "UserId" uuid NOT NULL,
    "ClaimType" text,
    "ClaimValue" text
);


ALTER TABLE public."AspNetUserClaims" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 109072)
-- Name: AspNetUserClaims_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."AspNetUserClaims" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."AspNetUserClaims_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 229 (class 1259 OID 109085)
-- Name: AspNetUserLogins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AspNetUserLogins" (
    "LoginProvider" text NOT NULL,
    "ProviderKey" text NOT NULL,
    "ProviderDisplayName" text,
    "UserId" uuid NOT NULL
);


ALTER TABLE public."AspNetUserLogins" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 109097)
-- Name: AspNetUserRoles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AspNetUserRoles" (
    "UserId" uuid NOT NULL,
    "RoleId" uuid NOT NULL
);


ALTER TABLE public."AspNetUserRoles" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 109112)
-- Name: AspNetUserTokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AspNetUserTokens" (
    "UserId" uuid NOT NULL,
    "LoginProvider" text NOT NULL,
    "Name" text NOT NULL,
    "Value" text
);


ALTER TABLE public."AspNetUserTokens" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 109045)
-- Name: AspNetUsers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AspNetUsers" (
    "Id" uuid NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL,
    "UserName" character varying(256),
    "NormalizedUserName" character varying(256),
    "Email" character varying(256),
    "NormalizedEmail" character varying(256),
    "EmailConfirmed" boolean NOT NULL,
    "PasswordHash" text,
    "SecurityStamp" text,
    "ConcurrencyStamp" text,
    "PhoneNumber" text,
    "PhoneNumberConfirmed" boolean NOT NULL,
    "TwoFactorEnabled" boolean NOT NULL,
    "LockoutEnd" timestamp with time zone,
    "LockoutEnabled" boolean NOT NULL,
    "AccessFailedCount" integer NOT NULL,
    "FullName" text DEFAULT ''::text NOT NULL
);


ALTER TABLE public."AspNetUsers" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 109052)
-- Name: Categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Categories" (
    "Id" uuid NOT NULL,
    "Name" text NOT NULL,
    "Description" text
);


ALTER TABLE public."Categories" OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 109124)
-- Name: Issues; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Issues" (
    "Id" uuid NOT NULL,
    "Title" text NOT NULL,
    "Description" text NOT NULL,
    "Status" character varying(30) NOT NULL,
    "PhotoUrl" text,
    "Location" text,
    "Point" public.geometry,
    "CreatedAt" timestamp with time zone NOT NULL,
    "UserId" uuid,
    "CategoryId" uuid
);


ALTER TABLE public."Issues" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 109141)
-- Name: ModeratorCategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ModeratorCategories" (
    "ModeratorId" uuid NOT NULL,
    "CategoryId" uuid NOT NULL
);


ALTER TABLE public."ModeratorCategories" OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 116185)
-- Name: RefreshTokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RefreshTokens" (
    "Id" uuid NOT NULL,
    "Token" text NOT NULL,
    "UserId" uuid NOT NULL,
    "Expires" timestamp with time zone NOT NULL
);


ALTER TABLE public."RefreshTokens" OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 109156)
-- Name: StatusHistories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StatusHistories" (
    "Id" uuid NOT NULL,
    "OldStatus" character varying(30) NOT NULL,
    "NewStatus" character varying(30) NOT NULL,
    "ChangedAt" timestamp with time zone NOT NULL,
    "IssueId" uuid NOT NULL,
    "ChangedByModeratorId" uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL
);


ALTER TABLE public."StatusHistories" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 109033)
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- TOC entry 5838 (class 0 OID 116149)
-- Dependencies: 235
-- Data for Name: Answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Answers" ("Id", "IssueId", "ModeratorId", "UpdatePhotoUrl", "Text", "CreatedAt") FROM stdin;
\.


--
-- TOC entry 5829 (class 0 OID 109060)
-- Dependencies: 226
-- Data for Name: AspNetRoleClaims; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AspNetRoleClaims" ("Id", "RoleId", "ClaimType", "ClaimValue") FROM stdin;
\.


--
-- TOC entry 5825 (class 0 OID 109038)
-- Dependencies: 222
-- Data for Name: AspNetRoles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AspNetRoles" ("Id", "Name", "NormalizedName", "ConcurrencyStamp") FROM stdin;
01957d08-0ab4-7282-959f-b9581cbd742c	Admin	ADMIN	\N
01957d08-0b49-76d4-8c31-e32b4ec63173	Moderator	MODERATOR	\N
01957d08-0b5c-7811-9905-27c4ac82cee9	User	USER	\N
\.


--
-- TOC entry 5831 (class 0 OID 109073)
-- Dependencies: 228
-- Data for Name: AspNetUserClaims; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AspNetUserClaims" ("Id", "UserId", "ClaimType", "ClaimValue") FROM stdin;
\.


--
-- TOC entry 5832 (class 0 OID 109085)
-- Dependencies: 229
-- Data for Name: AspNetUserLogins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AspNetUserLogins" ("LoginProvider", "ProviderKey", "ProviderDisplayName", "UserId") FROM stdin;
\.


--
-- TOC entry 5833 (class 0 OID 109097)
-- Dependencies: 230
-- Data for Name: AspNetUserRoles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AspNetUserRoles" ("UserId", "RoleId") FROM stdin;
4fbd8498-115b-4194-94dd-249ed292bd80	01957d08-0b5c-7811-9905-27c4ac82cee9
0195a5f6-d477-7e1e-86fd-d4475a958d73	01957d08-0ab4-7282-959f-b9581cbd742c
8a4268b2-c39a-4562-b9be-f78dd3dc3a55	01957d08-0b49-76d4-8c31-e32b4ec63173
0195cf1b-4450-77d8-8ada-87fdae2ba123	01957d08-0ab4-7282-959f-b9581cbd742c
1d9da412-e926-499a-862c-d467f31e831a	01957d08-0b5c-7811-9905-27c4ac82cee9
\.


--
-- TOC entry 5834 (class 0 OID 109112)
-- Dependencies: 231
-- Data for Name: AspNetUserTokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AspNetUserTokens" ("UserId", "LoginProvider", "Name", "Value") FROM stdin;
\.


--
-- TOC entry 5826 (class 0 OID 109045)
-- Dependencies: 223
-- Data for Name: AspNetUsers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AspNetUsers" ("Id", "CreatedAt", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", "PasswordHash", "SecurityStamp", "ConcurrencyStamp", "PhoneNumber", "PhoneNumberConfirmed", "TwoFactorEnabled", "LockoutEnd", "LockoutEnabled", "AccessFailedCount", "FullName") FROM stdin;
4fbd8498-115b-4194-94dd-249ed292bd80	2025-03-18 00:09:00.954252+03	tom@gmail.com	TOM@GMAIL.COM	tom@gmail.com	TOM@GMAIL.COM	t	AQAAAAIAAYagAAAAEJbHGieIBoKuZNlTellG6z2Y/cXAqISp9+HCedL6CiyNt0XkHA8CT0Ce890BGmH+lA==	6ULEMUGXOHMZUHFELIDJZZUPF4W3CFIZ	673f5205-2139-450e-9455-683f1b37a805	\N	f	f	\N	t	0	Tom
0195a5f6-d477-7e1e-86fd-d4475a958d73	2025-03-18 00:16:11.560442+03	admin@example.com	ADMIN@EXAMPLE.COM	admin@example.com	ADMIN@EXAMPLE.COM	t	AQAAAAIAAYagAAAAEH9C3C1trs5lT5zwswZbS+D1XuMoYcM4WvP2R85ZvmyFHz6sJJcnyv+E5BGtwdgKWw==	H425N7KGKRMKQ4KZXDMUJ6QX6MJ37ADW	2895ac59-8c5e-4c08-b156-22722e3997be	\N	f	f	\N	t	0	Alexander
8a4268b2-c39a-4562-b9be-f78dd3dc3a55	2025-03-18 00:25:56.304494+03	bob@gmail.com	BOB@GMAIL.COM	bob@gmail.com	BOB@GMAIL.COM	t	AQAAAAIAAYagAAAAEPP8mjO/JRYwvJ1E9+bGJHZh9b+ZXiOMLYp/rCpv6CYQ+4K2po5FR3NyNdVG8hVngw==	HHZRRF4SPUN2TX7PMWFSOEW2MRJWWO7N	a36bc9e2-1025-47bc-a02c-9353a0349184	\N	f	f	\N	t	0	Bob
0195cf1b-4450-77d8-8ada-87fdae2ba123	2025-03-26 00:00:25.429795+03	admin@gmail.com	ADMIN@GMAIL.COM	admin@gmail.com	ADMIN@GMAIL.COM	t	AQAAAAIAAYagAAAAEGLoWoHRIsTGbBsTf6zpJxxwa0ZYJ+9Hs+Gt2W7evU1qDwjV22N7v0t7IDP61V4ylw==	VKVDT6RBZC3SRVKAHEHDFRPIVTVZ732H	8ecf4005-5be4-4904-8ac7-5200b73494e2	\N	f	f	\N	t	0	Admin
1d9da412-e926-499a-862c-d467f31e831a	2025-03-31 01:33:29.993193+03	puser@gmail.com	PUSER@GMAIL.COM	puser@gmail.com	PUSER@GMAIL.COM	t	AQAAAAIAAYagAAAAEFfpEw8UXrMXotCZ1wb0XTEwhsQPPGpIAHV+IiI7nFlwkxQxX4gY73QtxQG5SUKaKg==	3UW2RYBCWX3SLUDK55545XONNR5GISOC	83b76662-2880-4d2b-a6c2-8d9eb8428094	\N	f	f	\N	t	0	puser
\.


--
-- TOC entry 5827 (class 0 OID 109052)
-- Dependencies: 224
-- Data for Name: Categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Categories" ("Id", "Name", "Description") FROM stdin;
3e8225ec-d424-4ea7-9a4d-40f400bed880	Дороги	Проблемы дорог
3c8c2ae3-302f-4642-811b-b87e711c409e	ЖКХ	Проблемы жкх
78b02b13-958f-4257-8b06-5378e1f6f3df	мусор	жесть
\.


--
-- TOC entry 5835 (class 0 OID 109124)
-- Dependencies: 232
-- Data for Name: Issues; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Issues" ("Id", "Title", "Description", "Status", "PhotoUrl", "Location", "Point", "CreatedAt", "UserId", "CategoryId") FROM stdin;
72a96f2b-8738-42f8-a2c6-6f892f4891d9	вода бл	прорвало трубу ааа	Pending	\N	\N	\N	2025-03-28 21:53:38.515364+03	\N	\N
c1c4ed49-5035-4c1d-a0e5-8c7bd1c6545d	ямама	на дороге2	Pending	\N	\N	\N	2025-03-29 01:07:56.828673+03	\N	\N
\.


--
-- TOC entry 5836 (class 0 OID 109141)
-- Dependencies: 233
-- Data for Name: ModeratorCategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ModeratorCategories" ("ModeratorId", "CategoryId") FROM stdin;
\.


--
-- TOC entry 5839 (class 0 OID 116185)
-- Dependencies: 236
-- Data for Name: RefreshTokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."RefreshTokens" ("Id", "Token", "UserId", "Expires") FROM stdin;
0195e96a-20f2-7068-881e-96bd2ba49a7e	e5993254-c752-4036-a998-b8b689fb8f30	1d9da412-e926-499a-862c-d467f31e831a	2025-04-07 02:36:41.458177+03
\.


--
-- TOC entry 5837 (class 0 OID 109156)
-- Dependencies: 234
-- Data for Name: StatusHistories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StatusHistories" ("Id", "OldStatus", "NewStatus", "ChangedAt", "IssueId", "ChangedByModeratorId") FROM stdin;
\.


--
-- TOC entry 5824 (class 0 OID 109033)
-- Dependencies: 221
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20250309222427_InitialCreate	9.0.2
20250316203429_AddAnswers	9.0.2
20250316203608_DelAnswerIdInIssue	9.0.2
20250316215919_AddFullName	9.0.2
20250328174208_UserAndCategoryInIssueIsNullTestTime	9.0.2
20250328223938_AddCategoryDescription	9.0.2
20250330231304_AddRefreshTokens	9.0.2
\.


--
-- TOC entry 5610 (class 0 OID 108275)
-- Dependencies: 217
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- TOC entry 5846 (class 0 OID 0)
-- Dependencies: 225
-- Name: AspNetRoleClaims_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AspNetRoleClaims_Id_seq"', 1, false);


--
-- TOC entry 5847 (class 0 OID 0)
-- Dependencies: 227
-- Name: AspNetUserClaims_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AspNetUserClaims_Id_seq"', 1, false);


--
-- TOC entry 5657 (class 2606 OID 116155)
-- Name: Answers PK_Answers; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "PK_Answers" PRIMARY KEY ("Id");


--
-- TOC entry 5630 (class 2606 OID 109066)
-- Name: AspNetRoleClaims PK_AspNetRoleClaims; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetRoleClaims"
    ADD CONSTRAINT "PK_AspNetRoleClaims" PRIMARY KEY ("Id");


--
-- TOC entry 5619 (class 2606 OID 109044)
-- Name: AspNetRoles PK_AspNetRoles; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetRoles"
    ADD CONSTRAINT "PK_AspNetRoles" PRIMARY KEY ("Id");


--
-- TOC entry 5633 (class 2606 OID 109079)
-- Name: AspNetUserClaims PK_AspNetUserClaims; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetUserClaims"
    ADD CONSTRAINT "PK_AspNetUserClaims" PRIMARY KEY ("Id");


--
-- TOC entry 5636 (class 2606 OID 109091)
-- Name: AspNetUserLogins PK_AspNetUserLogins; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetUserLogins"
    ADD CONSTRAINT "PK_AspNetUserLogins" PRIMARY KEY ("LoginProvider", "ProviderKey");


--
-- TOC entry 5639 (class 2606 OID 109101)
-- Name: AspNetUserRoles PK_AspNetUserRoles; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetUserRoles"
    ADD CONSTRAINT "PK_AspNetUserRoles" PRIMARY KEY ("UserId", "RoleId");


--
-- TOC entry 5641 (class 2606 OID 109118)
-- Name: AspNetUserTokens PK_AspNetUserTokens; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetUserTokens"
    ADD CONSTRAINT "PK_AspNetUserTokens" PRIMARY KEY ("UserId", "LoginProvider", "Name");


--
-- TOC entry 5624 (class 2606 OID 109051)
-- Name: AspNetUsers PK_AspNetUsers; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetUsers"
    ADD CONSTRAINT "PK_AspNetUsers" PRIMARY KEY ("Id");


--
-- TOC entry 5627 (class 2606 OID 109058)
-- Name: Categories PK_Categories; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "PK_Categories" PRIMARY KEY ("Id");


--
-- TOC entry 5646 (class 2606 OID 109130)
-- Name: Issues PK_Issues; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Issues"
    ADD CONSTRAINT "PK_Issues" PRIMARY KEY ("Id");


--
-- TOC entry 5649 (class 2606 OID 109145)
-- Name: ModeratorCategories PK_ModeratorCategories; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ModeratorCategories"
    ADD CONSTRAINT "PK_ModeratorCategories" PRIMARY KEY ("ModeratorId", "CategoryId");


--
-- TOC entry 5660 (class 2606 OID 116191)
-- Name: RefreshTokens PK_RefreshTokens; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshTokens"
    ADD CONSTRAINT "PK_RefreshTokens" PRIMARY KEY ("Id");


--
-- TOC entry 5653 (class 2606 OID 109160)
-- Name: StatusHistories PK_StatusHistories; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StatusHistories"
    ADD CONSTRAINT "PK_StatusHistories" PRIMARY KEY ("Id");


--
-- TOC entry 5617 (class 2606 OID 109037)
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- TOC entry 5621 (class 1259 OID 109176)
-- Name: EmailIndex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "EmailIndex" ON public."AspNetUsers" USING btree ("NormalizedEmail");


--
-- TOC entry 5654 (class 1259 OID 116167)
-- Name: IX_Answers_IssueId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Answers_IssueId" ON public."Answers" USING btree ("IssueId");


--
-- TOC entry 5655 (class 1259 OID 116168)
-- Name: IX_Answers_ModeratorId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Answers_ModeratorId" ON public."Answers" USING btree ("ModeratorId");


--
-- TOC entry 5628 (class 1259 OID 109171)
-- Name: IX_AspNetRoleClaims_RoleId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_AspNetRoleClaims_RoleId" ON public."AspNetRoleClaims" USING btree ("RoleId");


--
-- TOC entry 5631 (class 1259 OID 109173)
-- Name: IX_AspNetUserClaims_UserId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_AspNetUserClaims_UserId" ON public."AspNetUserClaims" USING btree ("UserId");


--
-- TOC entry 5634 (class 1259 OID 109174)
-- Name: IX_AspNetUserLogins_UserId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_AspNetUserLogins_UserId" ON public."AspNetUserLogins" USING btree ("UserId");


--
-- TOC entry 5637 (class 1259 OID 109175)
-- Name: IX_AspNetUserRoles_RoleId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_AspNetUserRoles_RoleId" ON public."AspNetUserRoles" USING btree ("RoleId");


--
-- TOC entry 5622 (class 1259 OID 109177)
-- Name: IX_AspNetUsers_Email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "IX_AspNetUsers_Email" ON public."AspNetUsers" USING btree ("Email");


--
-- TOC entry 5642 (class 1259 OID 109179)
-- Name: IX_Issues_CategoryId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Issues_CategoryId" ON public."Issues" USING btree ("CategoryId");


--
-- TOC entry 5643 (class 1259 OID 109180)
-- Name: IX_Issues_Status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Issues_Status" ON public."Issues" USING btree ("Status");


--
-- TOC entry 5644 (class 1259 OID 109181)
-- Name: IX_Issues_UserId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Issues_UserId" ON public."Issues" USING btree ("UserId");


--
-- TOC entry 5647 (class 1259 OID 109182)
-- Name: IX_ModeratorCategories_CategoryId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_ModeratorCategories_CategoryId" ON public."ModeratorCategories" USING btree ("CategoryId");


--
-- TOC entry 5658 (class 1259 OID 116197)
-- Name: IX_RefreshTokens_UserId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_RefreshTokens_UserId" ON public."RefreshTokens" USING btree ("UserId");


--
-- TOC entry 5650 (class 1259 OID 116166)
-- Name: IX_StatusHistories_ChangedByModeratorId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_StatusHistories_ChangedByModeratorId" ON public."StatusHistories" USING btree ("ChangedByModeratorId");


--
-- TOC entry 5651 (class 1259 OID 109184)
-- Name: IX_StatusHistories_IssueId; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_StatusHistories_IssueId" ON public."StatusHistories" USING btree ("IssueId");


--
-- TOC entry 5620 (class 1259 OID 109172)
-- Name: RoleNameIndex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "RoleNameIndex" ON public."AspNetRoles" USING btree ("NormalizedName");


--
-- TOC entry 5625 (class 1259 OID 109178)
-- Name: UserNameIndex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "UserNameIndex" ON public."AspNetUsers" USING btree ("NormalizedUserName");


--
-- TOC entry 5673 (class 2606 OID 116156)
-- Name: Answers FK_Answers_AspNetUsers_ModeratorId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "FK_Answers_AspNetUsers_ModeratorId" FOREIGN KEY ("ModeratorId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;


--
-- TOC entry 5674 (class 2606 OID 116161)
-- Name: Answers FK_Answers_Issues_IssueId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Answers"
    ADD CONSTRAINT "FK_Answers_Issues_IssueId" FOREIGN KEY ("IssueId") REFERENCES public."Issues"("Id") ON DELETE CASCADE;


--
-- TOC entry 5661 (class 2606 OID 109067)
-- Name: AspNetRoleClaims FK_AspNetRoleClaims_AspNetRoles_RoleId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetRoleClaims"
    ADD CONSTRAINT "FK_AspNetRoleClaims_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES public."AspNetRoles"("Id") ON DELETE CASCADE;


--
-- TOC entry 5662 (class 2606 OID 109080)
-- Name: AspNetUserClaims FK_AspNetUserClaims_AspNetUsers_UserId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetUserClaims"
    ADD CONSTRAINT "FK_AspNetUserClaims_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;


--
-- TOC entry 5663 (class 2606 OID 109092)
-- Name: AspNetUserLogins FK_AspNetUserLogins_AspNetUsers_UserId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetUserLogins"
    ADD CONSTRAINT "FK_AspNetUserLogins_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;


--
-- TOC entry 5664 (class 2606 OID 109102)
-- Name: AspNetUserRoles FK_AspNetUserRoles_AspNetRoles_RoleId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetUserRoles"
    ADD CONSTRAINT "FK_AspNetUserRoles_AspNetRoles_RoleId" FOREIGN KEY ("RoleId") REFERENCES public."AspNetRoles"("Id") ON DELETE CASCADE;


--
-- TOC entry 5665 (class 2606 OID 109107)
-- Name: AspNetUserRoles FK_AspNetUserRoles_AspNetUsers_UserId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetUserRoles"
    ADD CONSTRAINT "FK_AspNetUserRoles_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;


--
-- TOC entry 5666 (class 2606 OID 109119)
-- Name: AspNetUserTokens FK_AspNetUserTokens_AspNetUsers_UserId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AspNetUserTokens"
    ADD CONSTRAINT "FK_AspNetUserTokens_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;


--
-- TOC entry 5667 (class 2606 OID 116175)
-- Name: Issues FK_Issues_AspNetUsers_UserId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Issues"
    ADD CONSTRAINT "FK_Issues_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id");


--
-- TOC entry 5668 (class 2606 OID 116180)
-- Name: Issues FK_Issues_Categories_CategoryId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Issues"
    ADD CONSTRAINT "FK_Issues_Categories_CategoryId" FOREIGN KEY ("CategoryId") REFERENCES public."Categories"("Id");


--
-- TOC entry 5669 (class 2606 OID 109146)
-- Name: ModeratorCategories FK_ModeratorCategories_AspNetUsers_ModeratorId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ModeratorCategories"
    ADD CONSTRAINT "FK_ModeratorCategories_AspNetUsers_ModeratorId" FOREIGN KEY ("ModeratorId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;


--
-- TOC entry 5670 (class 2606 OID 109151)
-- Name: ModeratorCategories FK_ModeratorCategories_Categories_CategoryId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ModeratorCategories"
    ADD CONSTRAINT "FK_ModeratorCategories_Categories_CategoryId" FOREIGN KEY ("CategoryId") REFERENCES public."Categories"("Id") ON DELETE CASCADE;


--
-- TOC entry 5675 (class 2606 OID 116192)
-- Name: RefreshTokens FK_RefreshTokens_AspNetUsers_UserId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RefreshTokens"
    ADD CONSTRAINT "FK_RefreshTokens_AspNetUsers_UserId" FOREIGN KEY ("UserId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;


--
-- TOC entry 5671 (class 2606 OID 116169)
-- Name: StatusHistories FK_StatusHistories_AspNetUsers_ChangedByModeratorId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StatusHistories"
    ADD CONSTRAINT "FK_StatusHistories_AspNetUsers_ChangedByModeratorId" FOREIGN KEY ("ChangedByModeratorId") REFERENCES public."AspNetUsers"("Id") ON DELETE CASCADE;


--
-- TOC entry 5672 (class 2606 OID 109166)
-- Name: StatusHistories FK_StatusHistories_Issues_IssueId; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StatusHistories"
    ADD CONSTRAINT "FK_StatusHistories_Issues_IssueId" FOREIGN KEY ("IssueId") REFERENCES public."Issues"("Id") ON DELETE CASCADE;


-- Completed on 2025-03-31 02:43:39

--
-- PostgreSQL database dump complete
--

