package geolocation

import (
	"net"

	"github.com/oschwald/maxminddb-golang"
)

type record struct {
	Country struct {
		ISOCode string `maxminddb:"iso_code"`
	} `maxminddb:"country"`
	City struct {
		Names map[string]string `maxminddb:"names"`
	} `maxminddb:"city"`
}

type Resolver struct {
	reader *maxminddb.Reader
}

func NewResolver(dbPath string) (*Resolver, error) {
	reader, err := maxminddb.Open(dbPath)
	if err != nil {
		return nil, err
	}
	return &Resolver{reader: reader}, nil
}

func (r *Resolver) Close() error {
	if r == nil {
		return nil
	}
	return r.reader.Close()
}

func (r *Resolver) Resolve(ipStr string) (countryCode, city string) {
	if r == nil {
		return "", ""
	}

	ip := net.ParseIP(ipStr)
	if ip == nil {
		return "", ""
	}

	var rec record
	if err := r.reader.Lookup(ip, &rec); err != nil {
		return "", ""
	}

	countryCode = rec.Country.ISOCode
	if names := rec.City.Names; names != nil {
		city = names["en"]
	}

	return countryCode, city
}
