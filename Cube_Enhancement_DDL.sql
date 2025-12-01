
-- SQL DDL FOR CUBE ENHANCEMENTS
-- Orders Cube Enhancements

ALTER TABLE Orders ADD COLUMN order_name VARCHAR(255) DEFAULT NULL;
ALTER TABLE Orders ADD COLUMN section_id VARCHAR(50) DEFAULT NULL;
ALTER TABLE Orders ADD COLUMN section_name VARCHAR(100) DEFAULT NULL;
ALTER TABLE Orders ADD COLUMN customer_name VARCHAR(255) DEFAULT 'Guest Customer';
ALTER TABLE Orders ADD COLUMN team_member_name VARCHAR(255) DEFAULT 'System';
ALTER TABLE Orders ADD COLUMN order_tags JSON DEFAULT '[]';
ALTER TABLE Orders ADD COLUMN order_notes TEXT DEFAULT NULL;
ALTER TABLE Orders ADD COLUMN fulfillment_method VARCHAR(50) DEFAULT 'DINE_IN';
ALTER TABLE Orders ADD COLUMN order_priority VARCHAR(20) DEFAULT 'MEDIUM';
ALTER TABLE Orders ADD COLUMN order_duration_minutes DECIMAL(10,2) AS (
    TIMESTAMPDIFF(MINUTE, created_at, sale_timestamp)
) STORED;

-- CustomerSnapshots Cube Enhancements
ALTER TABLE CustomerSnapshots ADD COLUMN customer_visit_frequency INTEGER DEFAULT 1;
ALTER TABLE CustomerSnapshots ADD COLUMN customer_segment VARCHAR(50) DEFAULT 'NEW';
ALTER TABLE CustomerSnapshots ADD COLUMN customer_lifetime_value DECIMAL(10,2) DEFAULT 0.00;
ALTER TABLE CustomerSnapshots ADD COLUMN days_since_last_visit INTEGER DEFAULT 0;
ALTER TABLE CustomerSnapshots ADD COLUMN customer_tier VARCHAR(20) DEFAULT 'BRONZE';

-- PaymentAndRefunds Cube Enhancements  
ALTER TABLE PaymentAndRefunds ADD COLUMN device_type VARCHAR(50) DEFAULT 'UNKNOWN';
ALTER TABLE PaymentAndRefunds ADD COLUMN device_location VARCHAR(100) DEFAULT NULL;
ALTER TABLE PaymentAndRefunds ADD COLUMN payment_processor VARCHAR(50) DEFAULT 'SQUARE';

-- New Cubes
CREATE TABLE Sections (
    section_id VARCHAR(50) PRIMARY KEY,
    section_name VARCHAR(100) NOT NULL,
    section_description TEXT,
    location_id VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Customers (
    customer_id VARCHAR(50) PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_phone VARCHAR(50),
    customer_segment VARCHAR(50) DEFAULT 'NEW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Employees (
    employee_id VARCHAR(50) PRIMARY KEY,
    employee_name VARCHAR(255) NOT NULL,
    employee_role VARCHAR(100),
    employee_department VARCHAR(100),
    hire_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
