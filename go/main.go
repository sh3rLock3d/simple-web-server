package main

import(
	"fmt"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"log"
	"strconv"
	"crypto/sha256"
	"encoding/hex"
	"os"
	"bufio"
)

type Out struct {
	Name    string
	Result	string
  }

func readNthLine(file string, n int) string {
	f, err := os.Open(file)
	if err != nil {
		return ""
	}
	bf := bufio.NewReader(f)
	var line string
	for lnum := 0; lnum < n; lnum++ {
		line, err = bf.ReadString('\n')
	}
	return line
}




func writehandling(w http.ResponseWriter, r *http.Request)  {
	//TODO check wether it is a get or not
	keys, ok := r.URL.Query()["line"]
    if !ok || len(keys[0]) < 1 {
        log.Println("Url Param 'key' is missing")
        return
    }
	key := keys[0]
	//input number is ready
	if n, err := strconv.Atoi(key); err == nil {
		mydir, err := os.Getwd() 
    	if err != nil { 
        	fmt.Println(err) 
    	} 
		line := readNthLine(mydir + "/test.txt", n)
		fmt.Println(line)
		w.Write([]byte(line))
	} else {
		fmt.Println(key, "is not an integer.")
	}
}

func shahandling(w http.ResponseWriter, r *http.Request)  {
	//TODO check wether it is a post or not
	reqBody, err := ioutil.ReadAll(r.Body)
    if err != nil {
        log.Fatal(err)
    }
	fmt.Printf("%s\n", reqBody)
	var dat map[string]interface{}
	if err := json.Unmarshal(reqBody, &dat); err != nil {
        panic(err)
	}
	var t1 = dat["1"].(string)
	var t2 = dat["2"].(string)
	n1, err := strconv.ParseInt(t1, 10, 64)
	n2, err := strconv.ParseInt(t2, 10, 64)
	n1 = n1 + n2
	fmt.Println(n1)

	hash := sha256.New()
	s := strconv.FormatInt(n1, 10)
	hash.Write([]byte(s))
	md := hash.Sum(nil)
	mdStr := hex.EncodeToString(md)
	res := Out{"Ali", mdStr}

  	js, err := json.Marshal(res)
  	if err != nil {
    	http.Error(w, err.Error(), http.StatusInternalServerError)
    	return
  	}
  	w.Header().Set("Content-Type", "application/json")
  	w.Write(js)
}

func main()  {
	fmt.Println("Starting a web server...")
	http.HandleFunc("/go/sha256", shahandling)
	http.HandleFunc("/go/write/", writehandling)
	http.ListenAndServe(":3000", nil)
}
