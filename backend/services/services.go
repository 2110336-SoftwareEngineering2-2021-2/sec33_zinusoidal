package services

import (
	"fmt"
	"mime/multipart"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/spf13/viper"
)

type Service struct {
	awsSession *session.Session
}

func NewService(sess *session.Session) *Service {
	return &Service{
		awsSession: sess,
	}
}

func (s *Service) UploadFile(file multipart.FileHeader, fileName string) (string, error) {
	uploader := s3manager.NewUploader(s.awsSession)
	blobFile, err := file.Open()
	bucketName := viper.GetString("bucket.name")
	bucketZone := viper.GetString("bucket.zone")

	if err != nil {
		return "", fmt.Errorf("File corrupt")
	}

	_, err = uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucketName),
		ACL:    aws.String("public-read"),
		Key:    aws.String(fileName),
		Body:   blobFile,
	})
	if err != nil {
		return "", err
	}

	filepath := "https://" + bucketName + "." + "s3-" + bucketZone + ".amazonaws.com/" + fileName

	return filepath, nil
}
