import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GraphNode, GraphLink } from '../types';

interface RelationshipGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
}

export default function RelationshipGraph({ nodes, links }: RelationshipGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const updateDimensions = () => {
      if (!svgRef.current) return;
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;
      
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const simulation = d3.forceSimulation(nodes as any)
        .force("link", d3.forceLink(links).id((d: any) => d.id).distance(width < 500 ? 60 : 100))
        .force("charge", d3.forceManyBody().strength(width < 500 ? -100 : -200))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(width < 500 ? 20 : 30));

      const link = svg.append("g")
        .attr("stroke", "#ffffff0a")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value) * (width < 500 ? 1 : 2));

      const node = svg.append("g")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .call(d3.drag<any, any>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended) as any);

      node.append("circle")
        .attr("r", width < 500 ? 7 : 10)
        .attr("fill", d => d.sentiment > 0 ? "#00ffaa" : (d.sentiment < 0 ? "#ff0055" : "#6366f1"))
        .attr("filter", "blur(1px)")
        .style("cursor", "pointer");

      node.append("text")
        .attr("dx", width < 500 ? 10 : 15)
        .attr("dy", ".35em")
        .text(d => d.label)
        .attr("fill", "#94a3b8")
        .attr("font-size", width < 500 ? "8px" : "10px")
        .attr("font-family", "JetBrains Mono");

      simulation.on("tick", () => {
        link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y);

        node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
      });

      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return simulation;
    };

    const simulation = updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      simulation.stop();
      updateDimensions();
    });

    resizeObserver.observe(svgRef.current);

    return () => {
      simulation.stop();
      resizeObserver.disconnect();
    };
  }, [nodes, links]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-dashboard-bg/50 border border-card-border rounded-lg">
      <div className="absolute top-2 left-4 z-10">
        <span className="text-[10px] font-mono text-brand-primary uppercase tracking-widest opacity-60">Mô phỏng Đồ thị Quan hệ</span>
      </div>
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
