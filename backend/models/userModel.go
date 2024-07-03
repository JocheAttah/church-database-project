package models

import (
	"time"
)

// User represents the user model.
type User struct {
	ID                uint           `gorm:"primaryKey"`
	FirstName         string         `gorm:"type:varchar(100);not null"`
	MiddleName        string         `gorm:"type:varchar(100)"`
	LastName          string         `gorm:"type:varchar(100);not null"`
	Gender            string         `gorm:"type:varchar(10);not null"`
	MaritalStatus     string         `gorm:"type:varchar(50)"`
	MembershipStatus  string         `gorm:"type:varchar(50);not null;check:membership_status IN ('Woker in training', 'Member')"`
	Qualification     string         `gorm:"type:varchar(100)"`
	CellFellowship    string         `gorm:"type:varchar(100)"`
	Phone             string         `gorm:"type:varchar(15)"`
	Email             string         `gorm:"type:varchar(100);uniqueIndex;not null"`
	DOB               time.Time      `gorm:"type:date"`
	Class             string         `gorm:"type:varchar(50);not null;check:class IN ('Working Class', 'Student')"`
	DiscipledBy       string         `gorm:"type:varchar(100)"`
	Token             string         `gorm:"type:varchar(255)"`
	RefreshToken      string         `gorm:"type:varchar(255)"`
	CreatedAt         time.Time
	UpdatedAt         time.Time
	UserID            uint           `gorm:"not null"`
	Password          string         `gorm:"type:varchar(255);not null"` // Additional field for storing hashed password
}