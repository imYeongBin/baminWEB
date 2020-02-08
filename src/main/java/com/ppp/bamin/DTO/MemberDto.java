package com.ppp.bamin.DTO;

public class MemberDto {
	
	int memberNo;		//회원번호
	String memberNm;	//회원이름
	int attCnt;			//참석수
	String telNo;		//연락처
	String lctn;		//지역	
	String gndr;		//성별
	int age;			//나이
	int feeBalance;		//회비잔액
	
	public MemberDto() {

	}

	
	public MemberDto(int memberNo, String memberNm, int attCnt, String telNo, String lctn, String gndr,int age, int feeBalance) {
		
		this.memberNo = memberNo;
		this.memberNm = memberNm;
		this.attCnt = attCnt;
		this.telNo = telNo;
		this.lctn = lctn;
		this.gndr = gndr;
		this.age = age;
		this.feeBalance = feeBalance;
		
	}
	
	
	public int getMemberNo() {
		return memberNo;
	}

	public void setMemberNo(int memberNo) {
		this.memberNo = memberNo;
	}

	public String getMemberNm() {
		return memberNm;
	}

	public void setMemberNm(String memberNm) {
		this.memberNm = memberNm;
	}

	public int getAttCnt() {
		return attCnt;
	}

	public void setAttCnt(int attCnt) {
		this.attCnt = attCnt;
	}

	public String getTelNo() {
		return telNo;
	}

	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}

	public String getLctn() {
		return lctn;
	}

	public void setLtcn(String lctn) {
		this.lctn = lctn;
	}

	public String getGndr() {
		return gndr;
	}

	public void setGndr(String gndr) {
		this.gndr = gndr;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getFeeBalance() {
		return feeBalance;
	}

	public void setFeeBalance(int feeBalance) {
		this.feeBalance = feeBalance;
	}
	
	
	
	
	
	

}
