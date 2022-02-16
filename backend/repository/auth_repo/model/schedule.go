package model

import (
	"errors"
	"fmt"
	"strconv"
)

type WorkSchedule struct {
	Day      string     `json:"day"`
	TimeList [][]string `json:"timeList"`
}

var days []string = []string{"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}

func GetTimes(tim string) (int, int, error) {
	hours, err := strconv.Atoi(tim[:2])
	if err != nil {
		return -1, -1, err
	}
	mins, err := strconv.Atoi(tim[3:])
	if err != nil {
		return -1, -1, err
	}
	return hours, mins, nil
}

func ParseToPosition(tim string, days int) (int, error) {

	if len(tim) != 5 {
		return -1, errors.New("bads format")
	}

	if tim == "23:59" {
		pos, err := ParseToPosition("00:00", days)
		return pos + 48, err
	}

	hours, mins, err := GetTimes(tim)
	if err != nil {
		return -1, err
	}
	where := hours * 2
	if mins == 30 {
		where += 1
	}
	return days*48 + where, nil
}

func ParsePositionToString(pos int) string {
	pos = pos % 48
	mins := pos % 2
	hours := pos / 2
	result := ""
	result += fmt.Sprintf("%02d", hours) + ":"
	if mins == 1 {
		mins = 30
	}
	result += fmt.Sprintf("%02d", mins)
	return result
}

func ParseSchedule(works []WorkSchedule) (string, error) {
	if len(works) != 7 {
		return "", errors.New("some days were missing")
	}

	result_buffer := ""
	for i := 0; i < 336; i += 1 {
		result_buffer += "_"
	}
	result := []byte(result_buffer)

	var lst int = 0

	for id, schedule :=  works {
		if schedule.Day != days[id] {
			return "", errors.New("day " + days[id] + "doesn't match")
		}
		for _, time_ranges := range schedule.TimeList {
			if len(time_ranges) != 2 {
				return "", errors.New("timeList's internal length should be two")
			}
			start, err := ParseToPosition(time_ranges[0], id)
			if err != nil {
				return "", err
			}
			end, err := ParseToPosition(time_ranges[1], id)
			if err != nil {
				return "", err
			}
			var add byte = '0'
			if lst == 1 {
				add = '1'
			}
			for i := start; i < end; i += 1 {
				result[i] = add
			}
			lst ^= 1
		}
	}

	return string(result), nil
}

func ParseStringBackToSchedule(schdule string) ([]WorkSchedule, error) {
	if len(schdule) != 336 {
		return nil, errors.New("len of schedule is not 336")
	}
	result := make([]WorkSchedule, 7)
	for i := 0; i < 7; i += 1 {
		result[i].Day = days[i]
		result[i].TimeList = make([][]string, 0)
	}
	byte_schedule := []byte(schdule)
	for j, day_cnt := 0, 0; j < 336; j += 48 {
		for i := j; i < j+48; {
			if byte_schedule[i] == '_' {
				i += 1
				continue
			}
			k := i + 1
			for k < j+48 && byte_schedule[k] == byte_schedule[i] {
				k += 1
			}
			time_ranges := make([]string, 2)
			time_ranges[0] = ParsePositionToString(i)
			if k%48 == 0 {
				time_ranges[1] = "23:59"
			} else {
				time_ranges[1] = ParsePositionToString(k % 48)
			}
			result[day_cnt].TimeList = append(result[day_cnt].TimeList, time_ranges)
			i = k
		}
		day_cnt += 1
	}
	return result, nil
}
