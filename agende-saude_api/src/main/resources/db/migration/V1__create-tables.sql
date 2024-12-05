CREATE TABLE agende_media (
    id BIGSERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    size BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    data BYTEA NOT NULL
);

CREATE TABLE agende_user (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- ENUM substituído por VARCHAR para simplicidade
    access_level VARCHAR(50) DEFAULT 'BASIC',
    is_active BOOLEAN DEFAULT TRUE,
    profile_picture_id BIGINT,
    CONSTRAINT fk_user_profile_picture FOREIGN KEY (profile_picture_id) REFERENCES agende_media(id)
);

CREATE TABLE agende_person (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    cpf VARCHAR(11) NOT NULL UNIQUE,
    birth_date DATE,
    gender VARCHAR(50),
    blood_type VARCHAR(5),
    medical_history TEXT,
    CONSTRAINT fk_person_user FOREIGN KEY (user_id) REFERENCES agende_user(id)
);

CREATE TABLE agende_allergy (
    id BIGSERIAL PRIMARY KEY,
    person_id BIGINT NOT NULL,
    description VARCHAR(255) NOT NULL,
    severity VARCHAR(50),
    CONSTRAINT fk_allergy_person FOREIGN KEY (person_id) REFERENCES agende_person(id)
);

CREATE TABLE agende_medical_history (
    id BIGSERIAL PRIMARY KEY,
    person_id BIGINT NOT NULL,
    condition VARCHAR(255) NOT NULL,
    details TEXT,
    CONSTRAINT fk_medical_history_person FOREIGN KEY (person_id) REFERENCES agende_person(id)
);

CREATE TABLE agende_address (
    id BIGSERIAL PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    neighborhood VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zipcode VARCHAR(10) NOT NULL,
    latitude DECIMAL(10,6) NOT NULL,
    longitude DECIMAL(10,6) NOT NULL
);

CREATE TABLE agende_location (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id BIGINT NOT NULL,
    thumbnail_id BIGINT,
    address_id BIGINT NOT NULL,
    CONSTRAINT fk_location_user FOREIGN KEY (user_id) REFERENCES agende_user(id),
    CONSTRAINT fk_location_thumbnail FOREIGN KEY (thumbnail_id) REFERENCES agende_media(id),
    CONSTRAINT fk_location_address FOREIGN KEY (address_id) REFERENCES agende_address(id)
);

CREATE TABLE agende_consultation (
    id BIGSERIAL PRIMARY KEY,
    location_id BIGINT NOT NULL,
    responsible_doctor VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'COMMON',
    specialty VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL,
    CONSTRAINT fk_consultation_location FOREIGN KEY (location_id) REFERENCES agende_location(id)
);

CREATE TABLE agende_appointment (
    id BIGSERIAL PRIMARY KEY,
    person_id BIGINT NOT NULL,
    consultation_id BIGINT NOT NULL,
    date TIMESTAMP NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'SCHEDULED',
    CONSTRAINT fk_appointment_person FOREIGN KEY (person_id) REFERENCES agende_person(id),
    CONSTRAINT fk_appointment_consultation FOREIGN KEY (consultation_id) REFERENCES agende_consultation(id)
);

CREATE TABLE agende_screening (
    id BIGSERIAL PRIMARY KEY,
    appointment_id BIGINT NOT NULL,
    questionnaire JSONB NOT NULL,
    CONSTRAINT fk_screening_appointment FOREIGN KEY (appointment_id) REFERENCES agende_appointment(id)
);
