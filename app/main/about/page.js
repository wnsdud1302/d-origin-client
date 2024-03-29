import './about.css'

export default function page(){
    return(
      <div className="home">
        <div className="mb-8 ml-5">
                <Link className="return" href={`/`}>
                    <p>&lt;&nbsp;</p>
                </Link>
        </div>
        <div className="">
          <h1 className="text-center text-[32px] mt-[30px] font-bold">DESIGN . ORIGIN . ARCHITECT</h1>
          <br/>
          <p className="content">모든 디자인은 근원적인 데 있고 이에 한원한다. 
            그러나 우리는 단순히 현상을 기반한 디자인을 벗어나지 못했다. 
            <br/>
            이 타성과 혼돈, 반발은 근원적인 시점에서 응시할 수 있는 공간을 더욱 절실한 필연성으로 부딪치게 되었다. 
            <br/>
            이에 우리는 건축의 순수성과 보다 낳은 삶을 구축할 수 있는 소지를 마련하고 심화된 일상을 추구한다.
          </p>
          <br/>
          <p className="text-center text-[15px]">
          따라서 디오리진 건축은 관념보다는 실체, 일시적인 현상에 반하는 지속가능한 건축으로
          <br/> 
          건축주의 목적과 의도를 기반으로 구체적인 대안제시를 통해 
          <br/>
          건축설계뿐만 아니라 다양한 분야의 창조적 형태로 더 높은 가치의 실현을 추구한다.
          </p>
      </div>
    </div>

    )
}